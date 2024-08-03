.text

#The program checks the ALU instruction in I_type

Main:
		addi    x26 , x0 , -2048 
		addi    x2 , x0 , 196 
		sltu    x17 , x26 , x2 
		bltu    x26 , x2 , Less_i 
		bgeu    x26 , x2 , Bigger_i 
Less_i:
		ori     x9 , x26 , 108 
		sub     x23 , x2 , x26 
		srai    x23 , x23 , 2 
		and     x23 , x23 , x0 
		addi    x10 , x0 , 0 
		beq     x23 , x10 , Pass 
Bigger_i:
		ori     x9 , x26 , 33 
		sub     x23 , x2 , x26 
		srai    x23 , x23 , 1 
		and     x23 , x23 , x0 
		addi    x10 , x0 , 0 
		beq     x23 , x10 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
