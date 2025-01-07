.text

#The program checks the ALU instruction in I_type

Main:
		addi    x12 , x0 , 161 
		addi    x10 , x0 , 53 
		slt     x4 , x12 , x10 
		bltu    x12 , x10 , Less_i 
		bgeu    x12 , x10 , Bigger_i 
Less_i:
		ori     x18 , x12 , 175 
		sub     x29 , x10 , x12 
		srai    x29 , x29 , 0 
		and     x29 , x29 , x0 
		addi    x2 , x0 , 0 
		beq     x29 , x2 , Pass 
Bigger_i:
		ori     x18 , x12 , 195 
		sub     x29 , x10 , x12 
		srai    x29 , x29 , 4 
		and     x29 , x29 , x0 
		addi    x2 , x0 , 0 
		beq     x29 , x2 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
