.text

#The program checks the ALU instruction in I_type

Main:
		addi    x13 , x0 , 168 
		addi    x11 , x0 , 50 
		slt     x21 , x13 , x11 
		bltu    x13 , x11 , Less_i 
		bgeu    x13 , x11 , Bigger_i 
Less_i:
		ori     x29 , x13 , 3 
		sub     x3 , x11 , x13 
		srai    x3 , x3 , 3 
		and     x3 , x3 , x0 
		addi    x4 , x0 , 0 
		beq     x3 , x4 , Pass 
Bigger_i:
		ori     x29 , x13 , 66 
		sub     x3 , x11 , x13 
		srai    x3 , x3 , 1 
		and     x3 , x3 , x0 
		addi    x4 , x0 , 0 
		beq     x3 , x4 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
