.text

#The program checks the ALU instruction in I_type

Main:
		addi    x22 , x0 , -2048 
		addi    x19 , x0 , 91 
		sltu    x14 , x22 , x19 
		bltu    x22 , x19 , Less_i 
		bgeu    x22 , x19 , Bigger_i 
Less_i:
		ori     x6 , x22 , 172 
		sub     x21 , x19 , x22 
		srai    x21 , x21 , 1 
		and     x21 , x21 , x0 
		addi    x8 , x0 , 0 
		beq     x21 , x8 , Pass 
Bigger_i:
		ori     x6 , x22 , 39 
		sub     x21 , x19 , x22 
		srai    x21 , x21 , 0 
		and     x21 , x21 , x0 
		addi    x8 , x0 , 0 
		beq     x21 , x8 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
