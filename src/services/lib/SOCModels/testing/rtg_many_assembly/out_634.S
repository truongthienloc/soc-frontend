.text

#The program checks the ALU instruction in I_type

Main:
		addi    x3 , x0 , 166 
		addi    x23 , x0 , -2048 
		slti    x7 , x3 , 192 
		bltu    x3 , x23 , Less_i 
		bgeu    x3 , x23 , Bigger_i 
Less_i:
		ori     x11 , x3 , 40 
		sub     x6 , x23 , x3 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x15 , x0 , 0 
		beq     x6 , x15 , Pass 
Bigger_i:
		ori     x11 , x3 , 69 
		sub     x6 , x23 , x3 
		srai    x6 , x6 , 3 
		and     x6 , x6 , x0 
		addi    x15 , x0 , 0 
		beq     x6 , x15 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
