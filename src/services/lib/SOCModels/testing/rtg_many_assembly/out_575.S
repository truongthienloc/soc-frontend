.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , -2048 
		addi    x9 , x0 , 3 
		sltu    x24 , x7 , x9 
		bltu    x7 , x9 , Less_i 
		bgeu    x7 , x9 , Bigger_i 
Less_i:
		ori     x10 , x7 , 72 
		sub     x6 , x9 , x7 
		srai    x6 , x6 , 1 
		and     x6 , x6 , x0 
		addi    x20 , x0 , 0 
		beq     x6 , x20 , Pass 
Bigger_i:
		ori     x10 , x7 , 46 
		sub     x6 , x9 , x7 
		srai    x6 , x6 , 2 
		and     x6 , x6 , x0 
		addi    x20 , x0 , 0 
		beq     x6 , x20 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
