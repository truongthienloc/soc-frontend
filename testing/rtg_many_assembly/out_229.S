.text

#The program checks the ALU instruction in I_type

Main:
		addi    x21 , x0 , 179 
		addi    x8 , x0 , 118 
		slt     x11 , x21 , x8 
		bltu    x21 , x8 , Less_i 
		bgeu    x21 , x8 , Bigger_i 
Less_i:
		ori     x2 , x21 , 30 
		sub     x7 , x8 , x21 
		srai    x7 , x7 , 2 
		and     x7 , x7 , x0 
		addi    x29 , x0 , 0 
		beq     x7 , x29 , Pass 
Bigger_i:
		ori     x2 , x21 , 65 
		sub     x7 , x8 , x21 
		srai    x7 , x7 , 2 
		and     x7 , x7 , x0 
		addi    x29 , x0 , 0 
		beq     x7 , x29 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
