.text

#The program checks the ALU instruction in I_type

Main:
		addi    x20 , x0 , -2048 
		addi    x1 , x0 , 76 
		sltu    x14 , x20 , x1 
		bltu    x20 , x1 , Less_i 
		bgeu    x20 , x1 , Bigger_i 
Less_i:
		ori     x15 , x20 , 84 
		sub     x5 , x1 , x20 
		srai    x5 , x5 , 0 
		and     x5 , x5 , x0 
		addi    x11 , x0 , 0 
		beq     x5 , x11 , Pass 
Bigger_i:
		ori     x15 , x20 , 1 
		sub     x5 , x1 , x20 
		srai    x5 , x5 , 1 
		and     x5 , x5 , x0 
		addi    x11 , x0 , 0 
		beq     x5 , x11 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
