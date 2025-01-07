.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 53 
		addi    x8 , x0 , 52 
		sltu    x4 , x12 , x8 
		bltu    x12 , x8 , Less_i 
		bgeu    x12 , x8 , Bigger_i 
Less_i:
		ori     x22 , x12 , 17 
		sub     x21 , x8 , x12 
		srai    x21 , x21 , 0 
		and     x21 , x21 , x0 
		addi    x19 , x0 , 0 
		beq     x21 , x19 , Pass 
Bigger_i:
		ori     x22 , x12 , 189 
		sub     x21 , x8 , x12 
		srai    x21 , x21 , 2 
		and     x21 , x21 , x0 
		addi    x19 , x0 , 0 
		beq     x21 , x19 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
