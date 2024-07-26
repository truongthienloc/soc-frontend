.text

#The program checks the ALU instruction in I_type

Main:
		addi    x29 , x0 , 1 
		addi    x14 , x0 , 62 
		slt     x5 , x29 , x14 
		bltu    x29 , x14 , Less_i 
		bgeu    x29 , x14 , Bigger_i 
Less_i:
		ori     x13 , x29 , 160 
		sub     x6 , x14 , x29 
		srai    x6 , x6 , 4 
		and     x6 , x6 , x0 
		addi    x4 , x0 , 0 
		beq     x6 , x4 , Pass 
Bigger_i:
		ori     x13 , x29 , 20 
		sub     x6 , x14 , x29 
		srai    x6 , x6 , 1 
		and     x6 , x6 , x0 
		addi    x4 , x0 , 0 
		beq     x6 , x4 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
