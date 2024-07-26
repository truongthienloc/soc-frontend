.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , 32 
		addi    x11 , x0 , 31 
		sltu    x17 , x27 , x11 
		bltu    x27 , x11 , Less_i 
		bgeu    x27 , x11 , Bigger_i 
Less_i:
		ori     x28 , x27 , 118 
		sub     x5 , x11 , x27 
		srai    x5 , x5 , 0 
		and     x5 , x5 , x0 
		addi    x30 , x0 , 0 
		beq     x5 , x30 , Pass 
Bigger_i:
		ori     x28 , x27 , 43 
		sub     x5 , x11 , x27 
		srai    x5 , x5 , 2 
		and     x5 , x5 , x0 
		addi    x30 , x0 , 0 
		beq     x5 , x30 , Less_i 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
