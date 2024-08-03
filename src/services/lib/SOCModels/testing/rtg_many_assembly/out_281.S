.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , 151 
		addi    x9 , x0 , 150 
		sltu    x24 , x21 , x9 
		bltu    x21 , x9 , Less_i 
		bgeu    x21 , x9 , Bigger_i 
Less_i:
		ori     x6 , x21 , 36 
		sub     x18 , x9 , x21 
		srai    x18 , x18 , 2 
		and     x18 , x18 , x0 
		addi    x15 , x0 , 0 
		beq     x18 , x15 , Pass 
Bigger_i:
		ori     x6 , x21 , 112 
		sub     x18 , x9 , x21 
		srai    x18 , x18 , 4 
		and     x18 , x18 , x0 
		addi    x15 , x0 , 0 
		beq     x18 , x15 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
