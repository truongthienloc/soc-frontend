.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , -2048 
		addi    x29 , x0 , 13 
		sltu    x14 , x7 , x29 
		bltu    x7 , x29 , Less_i 
		bgeu    x7 , x29 , Bigger_i 
Less_i:
		ori     x11 , x7 , 172 
		sub     x27 , x29 , x7 
		srai    x27 , x27 , 3 
		and     x27 , x27 , x0 
		addi    x6 , x0 , 0 
		beq     x27 , x6 , Pass 
Bigger_i:
		ori     x11 , x7 , 50 
		sub     x27 , x29 , x7 
		srai    x27 , x27 , 1 
		and     x27 , x27 , x0 
		addi    x6 , x0 , 0 
		beq     x27 , x6 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
