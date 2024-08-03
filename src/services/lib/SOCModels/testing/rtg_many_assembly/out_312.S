.text

#The program checks the ALU instruction in I_type

Main:
		addi    x7 , x0 , 99 
		addi    x30 , x0 , 28 
		slt     x17 , x7 , x30 
		bltu    x7 , x30 , Less_i 
		bgeu    x7 , x30 , Bigger_i 
Less_i:
		ori     x27 , x7 , 18 
		sub     x14 , x30 , x7 
		srai    x14 , x14 , 1 
		and     x14 , x14 , x0 
		addi    x21 , x0 , 0 
		beq     x14 , x21 , Pass 
Bigger_i:
		ori     x27 , x7 , 77 
		sub     x14 , x30 , x7 
		srai    x14 , x14 , 1 
		and     x14 , x14 , x0 
		addi    x21 , x0 , 0 
		beq     x14 , x21 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
