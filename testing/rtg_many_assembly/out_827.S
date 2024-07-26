.text

#The program checks the ALU instruction in I_type

Main:
		addi    x31 , x0 , 143 
		addi    x4 , x0 , 73 
		slt     x25 , x31 , x4 
		bltu    x31 , x4 , Less_i 
		bgeu    x31 , x4 , Bigger_i 
Less_i:
		ori     x1 , x31 , 133 
		sub     x19 , x4 , x31 
		srai    x19 , x19 , 0 
		and     x19 , x19 , x0 
		addi    x18 , x0 , 0 
		beq     x19 , x18 , Pass 
Bigger_i:
		ori     x1 , x31 , 151 
		sub     x19 , x4 , x31 
		srai    x19 , x19 , 4 
		and     x19 , x19 , x0 
		addi    x18 , x0 , 0 
		beq     x19 , x18 , Pass 
Pass: 
		addi    x1 , x0 , 084 
		jal     x0 , End 
Fail: 
		addi    x1 , x0 , 070 
End: 
