.text

#The program checks the ALU instruction in I_type

Main:
		addi    x18 , x0 , 169 
		addi    x5 , x0 , 154 
		sltiu   x22 , x18 , 154 
		bltu    x18 , x5 , Less_i 
		bgeu    x18 , x5 , Bigger_i 
Less_i:
		ori     x1 , x18 , 67 
		sub     x21 , x5 , x18 
		srai    x21 , x21 , 0 
		and     x21 , x21 , x0 
		addi    x27 , x0 , 0 
		beq     x21 , x27 , Pass 
Bigger_i:
		ori     x1 , x18 , 33 
		sub     x21 , x5 , x18 
		srai    x21 , x21 , 4 
		and     x21 , x21 , x0 
		addi    x27 , x0 , 0 
		beq     x21 , x27 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
