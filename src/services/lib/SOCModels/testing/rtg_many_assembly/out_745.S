.text

#The program checks the ALU instruction in I_type

Main:
		addi    x4 , x0 , 125 
		addi    x11 , x0 , -2048 
		slti    x21 , x4 , 11 
		bltu    x4 , x11 , Less_i 
		bgeu    x4 , x11 , Bigger_i 
Less_i:
		ori     x28 , x4 , 20 
		sub     x5 , x11 , x4 
		srai    x5 , x5 , 3 
		and     x5 , x5 , x0 
		addi    x23 , x0 , 0 
		beq     x5 , x23 , Pass 
Bigger_i:
		ori     x28 , x4 , 180 
		sub     x5 , x11 , x4 
		srai    x5 , x5 , 4 
		and     x5 , x5 , x0 
		addi    x23 , x0 , 0 
		beq     x5 , x23 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
