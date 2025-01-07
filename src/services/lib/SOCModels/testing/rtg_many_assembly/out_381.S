.text

#The program checks the ALU instruction in I_type

Main:
		addi    x28 , x0 , 184 
		addi    x16 , x0 , 77 
		slt     x9 , x28 , x16 
		bltu    x28 , x16 , Less_i 
		bgeu    x28 , x16 , Bigger_i 
Less_i:
		ori     x15 , x28 , 85 
		sub     x30 , x16 , x28 
		srai    x30 , x30 , 0 
		and     x30 , x30 , x0 
		addi    x2 , x0 , 0 
		beq     x30 , x2 , Pass 
Bigger_i:
		ori     x15 , x28 , 159 
		sub     x30 , x16 , x28 
		srai    x30 , x30 , 4 
		and     x30 , x30 , x0 
		addi    x2 , x0 , 0 
		beq     x30 , x2 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
