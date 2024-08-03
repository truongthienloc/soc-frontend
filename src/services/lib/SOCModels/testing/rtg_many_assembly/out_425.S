.text

#The program checks the ALU instruction in I_type

Main:
		addi    x27 , x0 , 56 
		addi    x22 , x0 , 65 
		slt     x12 , x27 , x22 
		bltu    x27 , x22 , Less_i 
		bgeu    x27 , x22 , Bigger_i 
Less_i:
		ori     x29 , x27 , 116 
		sub     x30 , x22 , x27 
		srai    x30 , x30 , 3 
		and     x30 , x30 , x0 
		addi    x25 , x0 , 0 
		beq     x30 , x25 , Pass 
Bigger_i:
		ori     x29 , x27 , 190 
		sub     x30 , x22 , x27 
		srai    x30 , x30 , 2 
		and     x30 , x30 , x0 
		addi    x25 , x0 , 0 
		beq     x30 , x25 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
