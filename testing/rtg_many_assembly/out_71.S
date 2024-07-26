.text

#The program checks the ALU instruction in I_type

Main:
		addi    x1 , x0 , 4 
		addi    x8 , x0 , 24 
		slt     x16 , x1 , x8 
		bltu    x1 , x8 , Less_i 
		bgeu    x1 , x8 , Bigger_i 
Less_i:
		ori     x21 , x1 , 106 
		sub     x30 , x8 , x1 
		srai    x30 , x30 , 3 
		and     x30 , x30 , x0 
		addi    x26 , x0 , 0 
		beq     x30 , x26 , Pass 
Bigger_i:
		ori     x21 , x1 , 80 
		sub     x30 , x8 , x1 
		srai    x30 , x30 , 4 
		and     x30 , x30 , x0 
		addi    x26 , x0 , 0 
		beq     x30 , x26 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
