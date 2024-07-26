.text

#The program checks the ALU instruction in I_type

Main:
		addi    x16 , x0 , 184 
		addi    x18 , x0 , 178 
		slt     x28 , x16 , x18 
		bltu    x16 , x18 , Less_i 
		bgeu    x16 , x18 , Bigger_i 
Less_i:
		ori     x8 , x16 , 117 
		sub     x9 , x18 , x16 
		srai    x9 , x9 , 3 
		and     x9 , x9 , x0 
		addi    x22 , x0 , 0 
		beq     x9 , x22 , Pass 
Bigger_i:
		ori     x8 , x16 , 12 
		sub     x9 , x18 , x16 
		srai    x9 , x9 , 3 
		and     x9 , x9 , x0 
		addi    x22 , x0 , 0 
		beq     x9 , x22 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
