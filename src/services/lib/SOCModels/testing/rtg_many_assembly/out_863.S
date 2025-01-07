.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , 68 
		addi    x29 , x0 , 199 
		slt     x5 , x1 , x29 
		bltu    x1 , x29 , Less_i 
		bgeu    x1 , x29 , Bigger_i 
Less_i:
		ori     x31 , x1 , 0 
		sub     x27 , x29 , x1 
		srai    x27 , x27 , 0 
		and     x27 , x27 , x0 
		addi    x6 , x0 , 0 
		beq     x27 , x6 , Pass 
Bigger_i:
		ori     x31 , x1 , 160 
		sub     x27 , x29 , x1 
		srai    x27 , x27 , 2 
		and     x27 , x27 , x0 
		addi    x6 , x0 , 0 
		beq     x27 , x6 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
