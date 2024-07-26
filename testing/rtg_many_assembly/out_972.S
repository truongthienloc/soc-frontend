.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , -2048 
		addi    x30 , x0 , 58 
		sltu    x16 , x29 , x30 
		bltu    x29 , x30 , Less_i 
		bgeu    x29 , x30 , Bigger_i 
Less_i:
		ori     x11 , x29 , 63 
		sub     x7 , x30 , x29 
		srai    x7 , x7 , 0 
		and     x7 , x7 , x0 
		addi    x23 , x0 , 0 
		beq     x7 , x23 , Pass 
Bigger_i:
		ori     x11 , x29 , 44 
		sub     x7 , x30 , x29 
		srai    x7 , x7 , 2 
		and     x7 , x7 , x0 
		addi    x23 , x0 , 0 
		beq     x7 , x23 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
