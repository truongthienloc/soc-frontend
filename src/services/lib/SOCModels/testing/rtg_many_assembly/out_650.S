.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , 149 
		addi    x25 , x0 , -2048 
		slti    x15 , x1 , 938 
		bltu    x1 , x25 , Less_i 
		bgeu    x1 , x25 , Bigger_i 
Less_i:
		ori     x29 , x1 , 64 
		sub     x13 , x25 , x1 
		srai    x13 , x13 , 2 
		and     x13 , x13 , x0 
		addi    x11 , x0 , 0 
		beq     x13 , x11 , Pass 
Bigger_i:
		ori     x29 , x1 , 81 
		sub     x13 , x25 , x1 
		srai    x13 , x13 , 1 
		and     x13 , x13 , x0 
		addi    x11 , x0 , 0 
		beq     x13 , x11 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
